export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'POST required'});
  const {url,niche,baseline}=req.body||{};
  if(!/^https?:\/\/(www\.)?instagram\.com\/reel\//i.test(url||'')) return res.status(400).json({error:'Valid Instagram Reel URL required'});
  res.status(200).json({
    ok:true,
    mode:'setup_required',
    message:'Production adapter required for authorized Instagram/Meta media + insights and AI vision/transcript analysis.',
    input:{url,niche,baseline},
    required:{instagram:['media metadata','views where available','likes/comments where permitted','insights for authorized account'],analysis:['transcript','visual pacing','hook','CTA','trend match'],prediction:['creator baseline','category benchmark','trend velocity','historical outcomes']}
  });
}
