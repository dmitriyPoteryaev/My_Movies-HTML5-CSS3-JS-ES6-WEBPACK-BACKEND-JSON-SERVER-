// Взаимодейтсвие с backом.back-end запросы.Fetch
const getResource = async (url) => {
  const res = await fetch(url);

  // Ранее,когда мы использовали XMLHttpRequest мы могли отслеживать текущее состояние ответа от сервера(response)
  // fetch напрямую данными методами не обладает .Он может отследить ошибку только по отключённому интернет-соединению
  // Как же тогда можно отслежить ответ от сервера ,если он отрицательный?

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status:${res.status}`);
  }

  return await res.json();
};

export { getResource };
