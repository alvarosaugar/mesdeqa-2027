import lume from "lume/mod.ts";
import top from "top/mod.ts";

const site = lume();

site.use(top());

// Ficheros del repo que no son parte de la web
site.ignore("README.md", "tests");

export default site;
