export default () => ({
  postman_collection: process.env.postman_collection as string,
  cypress_template: process.env.cypress_template as string,
  export_folder: process.env.export_folder as string,
});
