import React from 'react'

import { MountEverest, BackgroundDisplay } from "./styles"

import { Attribution } from "./types"

import { Widgets } from '../src/widget'

const Layout = ({ children, background, attribution }: { children: any; background: string; attribution: Attribution }) => {
	const [ready, setReady] = React.useState(false);
	const [backgroundLoaded, setBackgroundLoaded] = React.useState(false);
	const [backgroundDimmed, setBackgroundDimmed] = React.useState(false);

	const [settingsVisible, setSettingsVisible] = React.useState(false);

	React.useEffect(() => {
		setReady(true);

		if(typeof(window) !== "undefined") (window as any)["Widgets"] = Widgets;
	});

	return (
		<>
			<BackgroundDisplay 
				src={background} 
				loaded={true} 
				dimmed={backgroundDimmed}
				onLoad={() => setBackgroundLoaded(true)}
				settingsVisible={settingsVisible}
			/>
			<div style={{ display: "flex", flexDirection: "row" }}>
				{ready && <MountEverest settingsVisible={settingsVisible}>
					{Widgets.registeredWidgets.map((widget) => (
						<widget.component metadata={JSON.stringify({ name: widget.name, author: widget.author })} id={widget.id}  />
					))}
				</MountEverest>}
			</div>
			{children}
		</>
	)
}

export default Layout