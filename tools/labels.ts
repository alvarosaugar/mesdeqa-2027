/**
 * Crea o actualiza en GitHub las labels de .github/labels.yml.
 * Uso: deno task labels <owner/repo>
 * Requiere `gh` con sesión iniciada. Idempotente: `gh label create --force`
 * actualiza color y descripción si la label ya existe. No borra labels que
 * no estén en el fichero.
 */
import { parse } from "jsr:@std/yaml@1";

interface Label {
  name: string;
  color: string;
  description: string;
}

const repo = Deno.args[0];
if (!repo || !repo.includes("/")) {
  console.error("Uso: deno task labels <owner/repo>");
  Deno.exit(1);
}

const labels = parse(await Deno.readTextFile(".github/labels.yml")) as Label[];

for (const label of labels) {
  if (
    typeof label.color !== "string" || !/^[0-9a-f]{6}$/i.test(label.color) ||
    label.description.length > 100
  ) {
    console.error(
      `✗ ${label.name}: color debe ser hex de 6 cifras y la descripción ≤ 100 caracteres`,
    );
    Deno.exit(1);
  }
  const { code, stderr } = await new Deno.Command("gh", {
    args: [
      "label",
      "create",
      label.name,
      "--repo",
      repo,
      "--color",
      label.color,
      "--description",
      label.description,
      "--force",
    ],
  }).output();
  if (code !== 0) {
    console.error(
      `✗ ${label.name}: ${new TextDecoder().decode(stderr).trim()}`,
    );
    Deno.exit(1);
  }
  console.log(`✓ ${label.name}`);
}
