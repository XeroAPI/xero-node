module.exports = {
    mode: 'file',
    includes: 'src/',
    exclude: '**/{__tests__,lib}/**/*',
    out: 'docs/',
    excludeExternals: true,
    excludeNotExported: true,
	excludePrivate: true,
	//includeDeclarations: true
};
