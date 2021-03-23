export function buildClassName(...args) {

	var className = "";
	var classes = [];

	args.forEach(el => {
		if(el !== undefined && typeof el == "string") {
			Object.keys(el.split(",").map(value => {
				if(classes.indexOf(value) === -1)
					classes.push(value);
			}));
		}
	});

	className = classes.join(" ");
	return className;
}

