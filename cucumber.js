const common = [
    '--require-module ts-node/register' // Load TypeScript module
];

const boxOffice_api = [
    ...common,
    'tests/Apps/BoxOffice/api/features/**/*.feature',
    '--require tests/Apps/BoxOffice/api/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
    boxOffice_api,
};