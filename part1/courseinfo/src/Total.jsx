const Total = ({ parts }) => (
	<p>
		Number of exercises {parts.reduce((accumulator, part) => {
			return {
				exercises: accumulator.exercises + part.exercises
			}
		}).exercises}
	</p>
)

export default Total