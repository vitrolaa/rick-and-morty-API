import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: '#3c3e44',
		borderRadius: 8,
	},
	image: {
		width: 220,
		height: 229,
	},
	card: {
		padding: 13,
		flex: 1,
		flexDirection: 'column',
	},
	section: {
		marginBottom: 5,
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	status: {
		fontSize: 14,
		color: '#7a7f86',
	},
	location: {
		marginTop: 10,
	},
	firstSeen: {
		marginTop: 5,
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#a8a8a8',
	},
	trueLocation: {
		fontSize: 14,
		color: '#fff',
	},
})
