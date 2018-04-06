module.exports = {
    mode: 'file',
    includes: 'src/',
    exclude: '**/__tests__/**/*',
    out: 'docs/v3/',
	theme: 'docs_theme/',
    excludeExternals: true,
    excludeNotExported: true,
	excludePrivate: true
};
