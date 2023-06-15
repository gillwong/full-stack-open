import Part from "./Part";

const Content = ({ parts }) => (
	<div>
		{parts.map(part => (
			<Part key={part.id} title={part.name} exercises={part.exercises} />
		))}
	</div>
)

export default Content;