export default async function handler(req,res){
  const niche=(req.query?.niche||'Other').toString();
  res.status(200).json({
    ok:true,
    mode:'setup_required',
    niche,
    message:'Connect a server-side trend/search provider here. Do not put API keys in GitHub Pages frontend.',
    requiredSignals:['rising reel formats','audio velocity','creator adoption','festival/event calendar','regional relevance','niche fit','saturation']
  });
}
