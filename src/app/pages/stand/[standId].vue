<script lang="ts" setup>
import type { StandDefinition } from '~~/shared/types/products';
const stands: StandDefinition[] = [
  { standId: 'foo', name: 'OPB Beer Truck', imageUrl: '' },
  { standId: 'bar', name: 'HDP Burguers', imageUrl: '' },
  { standId: 'baz', name: 'Barra Cosquin', imageUrl: '' },
  { standId: 'faa', name: 'Chelato Helados', imageUrl: '' },
]

</script>

<template>
  <div>
    <stand-select :stands="stands" :seleceted="stands[0]"></stand-select>
  </div>
</template>
