import {NextApiRequest, NextApiResponse} from 'next';
import {renderToStaticMarkup} from 'react-dom/server';
import Icons, {IconType} from 'react-icons';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {iconName} = req.query as {iconName: string};

  console.log(Icons);

  // const iconModulePath = `react-icons/${
  //   Array.isArray(iconPath) ? iconPath.join('/') : iconPath
  // }`;
  // const icon: IconType = await import(iconModulePath).then(
  //   (mod) => mod[Object.keys(mod)[0]]
  // );

  // try {
  //   const icon = (Icons as {[key: string]: IconType})[iconName];
  //   const svg = renderToStaticMarkup(icon({}));
  //   res.setHeader('Content-Type', 'image/svg+xml');
  //   res.status(200).send(svg);
  // } catch (error) {
  //   console.error(error);
  //   res.status(404).json({message: 'Icon not found'});
  // }
}
