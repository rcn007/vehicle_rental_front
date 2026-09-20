<template>
  <RouterView />
</template>

<script>
fetch('/api/vehicle/getAll')
.then(response => response.json())
.then(data => console.log(data))
 .catch(error => console.error(error))
</script>