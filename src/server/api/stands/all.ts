export default defineEventHandler(async (event) => {
  const stands: StandDefinition[] = [
    { standId: "foo", name: "OPB Beer Truck", imageUrl: "" },
    { standId: "bar", name: "HDP Burguers", imageUrl: "" },
    { standId: "baz", name: "Barra Cosquin", imageUrl: "" },
    { standId: "faa", name: "Chelato Helados", imageUrl: "" },
  ];
  return stands;
})
