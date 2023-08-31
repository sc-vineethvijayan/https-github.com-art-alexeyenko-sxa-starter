/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, plugins, the global config module,
  and the component name to component mapping.
*/
console.log('THIS IS ENV URL');
console.log(process.env.URL);
console.log(process.env.DEPLOY_PRIME_URL);
console.log(process.env.DEPLOY_URL);
console.log(process.env.DEPLOY_ID);
/*
   PLUGINS GENERATION
*/
import './generate-plugins';

/*
  CONFIG GENERATION
*/
import './generate-config';

/*
  COMPONENT BUILDER GENERATION
*/
import './generate-component-builder';
