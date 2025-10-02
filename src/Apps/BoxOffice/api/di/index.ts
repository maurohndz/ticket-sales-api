import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);

// Inicialización asíncrona para garantizar que el contenedor cargue antes de usarse
export const mountContainer = (async () => {
    try {
        await loader.load(__dirname + `/application_${process.env.ENVIRONMENT}.yaml`);
    } catch (error) {
        console.error('Error loading container configuration:', error);
        throw error;
    }

    return container;
})();

export default container;