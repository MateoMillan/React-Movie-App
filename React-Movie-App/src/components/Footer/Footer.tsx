import { IoMailOutline, IoCallOutline } from "react-icons/io5";
import "./Footer.css"

export default function Footer({ items }: Items) {
	return (
		<>
			<footer className="footer">
				{items.map((item, index: number) => {
					let IconoComponente: string | null;
					switch (item.icon) {
						case "IoMailOutline":
							IconoComponente = IoMailOutline;
							break;
						case "IoCallOutline":
							IconoComponente = IoCallOutline;
							break;
						default:
							IconoComponente = null;
					}
					return (
						<div key={index} className="item-container">
							<h4 className="footer-item">{item.text[0]}</h4>
							<a className="footer-item" href={item.text[2]}>
								{item.text[1]}
							</a>
							{IconoComponente && <IconoComponente />}
						</div>
					);
				})}
			</footer>
		</>
	);
}
