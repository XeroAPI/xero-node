module.exports = {
    mode: 'file',
    includes: 'src/',
    exclude: '**/_*tests__/**/*',
    out: 'docs/v3/',
	theme: 'docs_theme/',
    excludeExternals: true,
    excludeNotExported: true,
	excludePrivate: true
};
