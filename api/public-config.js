module.exports = function handler(_req, res) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (!supabaseUrl || !supabaseAnonKey) {
    res.status(503).send('console.error("Supabase public configuration is missing.");');
    return;
  }

  const config = JSON.stringify({
    supabaseUrl,
    supabaseAnonKey,
  });

  res.status(200).send(
    `window.__PROJECT_HUB_CONFIG__ = Object.assign({}, window.__PROJECT_HUB_CONFIG__ || {}, ${config});`
  );
};
