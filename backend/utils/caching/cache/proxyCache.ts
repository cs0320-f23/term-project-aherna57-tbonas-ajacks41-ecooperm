// import { LoadingCache, CacheBuilder, CacheLoader } from 'google-guava-cache';

// export class ProxyCache<K, V> {
//     private readonly cache: LoadingCache<K, V>;

//     constructor(cacheLoader: CacheLoader<K, V>, duration: number, timeUnit: TimeUnit, maxSize: number) {
//         this.cache = CacheBuilder.newBuilder()
//             .maximumSize(maxSize)
//             .expireAfterWrite(duration, timeUnit)
//             .recordStats()
//             .build(cacheLoader);
//     }

//     public get(argument: K): V {
//         try {
//             return this.cache.getUnchecked(argument);
//         } catch (e) {
//             console.error(e.message);
//             throw new Error(`There was an issue getting data for ${argument}`);
//         }
//     }

//     public getSize(): number {
//         return this.cache.size();
//     }
// }
