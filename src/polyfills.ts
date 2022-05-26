// Taken from https://github.com/ionic-team/rollup-plugin-node-polyfills/blob/master/src/modules.ts

import { NodePolyfillsOptions } from '.'

const EMPTY_PATH = require.resolve(
    '@doiim/rollup-plugin-node-polyfills/polyfills/empty.js',
)

export function builtinsPolyfills() {
    const libs = new Map()

    libs.set(
        'process',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/process-es6'),
    )
    libs.set(
        'buffer',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/buffer-es6'),
    )
    libs.set(
        'util',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/util'),
    )
    libs.set('sys', libs.get('util'))
    libs.set(
        'events',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/events'),
    )
    libs.set(
        'stream',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/stream'),
    )
    libs.set(
        'path',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/path'),
    )
    libs.set(
        'querystring',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/qs'),
    )
    libs.set(
        'punycode',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/punycode'),
    )
    libs.set(
        'url',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/url'),
    )
    libs.set(
        'string_decoder',
        require.resolve(
            '@doiim/rollup-plugin-node-polyfills/polyfills/string-decoder',
        ),
    )
    libs.set(
        'http',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/http'),
    )
    libs.set(
        'https',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/http'),
    )
    libs.set('os', require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/os'))
    libs.set(
        'assert',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/assert'),
    )
    libs.set(
        'constants',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/constants'),
    )
    libs.set(
        '_stream_duplex',
        require.resolve(
            '@doiim/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
        ),
    )
    libs.set(
        '_stream_passthrough',
        require.resolve(
            '@doiim/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
        ),
    )
    libs.set(
        '_stream_readable',
        require.resolve(
            '@doiim/rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
        ),
    )
    libs.set(
        '_stream_writable',
        require.resolve(
            '@doiim/rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
        ),
    )
    libs.set(
        '_stream_transform',
        require.resolve(
            '@doiim/rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
        ),
    )
    libs.set(
        'timers',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/timers'),
    )
    libs.set(
        'console',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/console'),
    )
    libs.set('vm', require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/vm'))
    libs.set(
        'zlib',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/zlib'),
    )
    libs.set(
        'tty',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/tty'),
    )
    libs.set(
        'domain',
        require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/domain'),
    )

    // not shimmed
    libs.set('dns', EMPTY_PATH)
    libs.set('dgram', EMPTY_PATH)
    libs.set('child_process', EMPTY_PATH)
    libs.set('cluster', EMPTY_PATH)
    libs.set('module', EMPTY_PATH)
    libs.set('net', EMPTY_PATH)
    libs.set('readline', EMPTY_PATH)
    libs.set('repl', EMPTY_PATH)
    libs.set('tls', EMPTY_PATH)
    libs.set('fs', EMPTY_PATH)
    libs.set('crypto', EMPTY_PATH)

    // libs.set(
    //     'fs',
    //     require.resolve('@doiim/rollup-plugin-node-polyfills/polyfills/browserify-fs'),
    // )

    // TODO enable crypto and fs https://github.com/ionic-team/@doiim/rollup-plugin-node-polyfills/issues/20
    // libs.set(
    //     'crypto',
    //     require.resolve(
    //         '@doiim/rollup-plugin-node-polyfills/polyfills/crypto-browserify',
    //     ),
    // )

    return libs
}
