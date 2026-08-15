(() => {
  const replaceBrandText = () => {
    document.title = document.title.replaceAll('Phoenix Inc. Development','Phoenix Inc | Development').replaceAll('Phoenix Inc Development','Phoenix Inc | Development');
    document.querySelectorAll('meta[name="description"]').forEach(meta => {
      meta.content = meta.content.replaceAll('Phoenix Inc. Development','Phoenix Inc | Development').replaceAll('Phoenix Inc Development','Phoenix Inc | Development');
    });
    document.querySelectorAll('.v2-brand,