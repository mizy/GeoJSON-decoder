# geojson-decoder 解压/压缩工具

# api
```
import encoder from 'GeoJSONDecoder';
encoder.encode( {
         "type": "MultiLineString",
         "coordinates": [
             [
                 [100.0, 0.0],
                 [101.0, 1.0]
             ],
             [
                 [102.0, 2.0],
                 [103.0, 3.0]
             ]
         ]
})
encoder.decode({})
```

# 注意