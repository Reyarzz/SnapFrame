export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { license_key } = req.body;

  if (!license_key) {
    return res.status(400).json({ success: false, error: 'Missing license key' });
  }

  try {
    const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        product_id: 'gwY6ara8I5xgeof0CdXesQ==',
        license_key: license_key,
      }),
    });

    const data = await response.json();
    return res.status(200).json({
      success: data.success === true,
      uses: data.uses,
      purchase: data.purchase ? {
        email: data.purchase.email,
        created_at: data.purchase.created_at,
      } : null,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Verification failed' });
  }
}
