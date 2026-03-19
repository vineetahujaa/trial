export const onRequest = [async (context) => {
  // TEMP: disable auth so everything works
  context.data = context.data || {};
  context.data.userId = "demo-user";
  return context.next();
}];
