module.exports = {
    mode: 'file',
    includes: 'src/',
    exclude: '**/{__tests__,lib}/**/*',
    out: 'docs/v3/',
    excludeExternals: true,
    excludeNotExported: true,
	excludePrivate: true,
	//includeDeclarations: true
};
