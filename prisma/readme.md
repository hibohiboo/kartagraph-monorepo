## DBスキーマ方針
DBファーストとする。

型は `prisma db pull`でschema.prismaをDBから作成した後、そのファイルに下記を追記する。

```
generator zod {
  provider = "zod-prisma-types"
}
```


その後、`prisma generate`で generated/zod/index.tsファイルを作成する。

types/index.d.tsでは作成されたファイルから型定義を抽出する。
