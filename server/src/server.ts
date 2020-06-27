import server from './App';

const PORT = process.env.APP_PORT;

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}!`));
