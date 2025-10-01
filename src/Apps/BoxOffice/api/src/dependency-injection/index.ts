import path from 'path';
import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);

// Carga el YAML principal con ruta absoluta
loader.load(path.join(__dirname, 'application.yaml'));

// Debug: ver qué servicios cargó
console.log('Servicios cargados desde YAML:', [...container.definitions.keys()]);

container.compile();

console.log('Servicios compilados:', [...container.definitions.keys()]);

export default container;