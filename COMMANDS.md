# Android

Gerar localmente arquivo `APK` para instalação

```bash
eas build -p android --profile preview --local
```

Gerar remotamente arquivo `APK` para distribuição interna

```bash
eas build -p android --profile preview
```

Gerar remotamente arquivo `AAB` para produção

```bash
eas build -p android --profile production --message "First production deploy"
```