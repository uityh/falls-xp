import {
	FormControl,
	MenuItem,
	TextField,
	Select as MuiSelect,
	FormHelperText,
	InputLabel,
} from '@mui/material';
import React from 'react';

export function TextInput({
	field: { name, value, onChange, onBlur },
	form: { errors, touched },
	label,
	required = false,
	...rest
}) {
	return (
		<FormControl fullWidth>
			<TextField
				variant="outlined"
				label={label}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				error={touched[name] && Boolean(errors[name])}
				helperText={touched[name] && errors[name]}
				required={required}
				{...rest}
			/>
		</FormControl>
	);
}

export function Select({
	field: { name, value, onChange, onBlur },
	form: { errors, touched },
	label,
	required = false,
	options,
	...rest
}) {
	return (
		<FormControl fullWidth required={required}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect
				label={label}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				{...rest}
			>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</MuiSelect>
			<FormHelperText error={touched[name] && Boolean(errors[name])}>
				{touched[name] && errors[name]}
			</FormHelperText>
		</FormControl>
	);
}
