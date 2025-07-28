import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
const env = process.env.ENVIRONMENT || 'dev';

loader.load(`${__dirname}/application_${env}.yaml`);

export default container;