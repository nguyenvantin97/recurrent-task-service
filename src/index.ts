import fastifyApp from './App';

try {
  fastifyApp.listen(Number(process.env.PORT) || 8080);
} catch (error) {
  fastifyApp.log.error(error);
}
