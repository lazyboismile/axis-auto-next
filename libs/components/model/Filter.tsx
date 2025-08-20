import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Checkbox, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Stack, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { modelYears } from '../../config';
import { ModelBodyType, ModelBrand, ModelColour, ModelLocation } from '../../enums/model.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ModelsInquiry } from '../../types/model/model.input';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: ModelsInquiry;
	setSearchFilter: any;
	initialInput: ModelsInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [modelBrand, setModelBrand] = useState<ModelBrand[]>(Object.values(ModelBrand));
	const [modelType, setModelType] = useState<ModelBodyType[]>(Object.values(ModelBodyType));
	const [modelLocation, setModelLocation] = useState<ModelLocation[]>(Object.values(ModelLocation));
	const [modelColour, setModelColour] = useState<ModelColour[]>(Object.values(ModelColour));
	const [searchText, setSearchText] = useState<string>('');
	const [showMoreBrand, setShowMoreBrand] = useState(false);
	const [showMoreLocation, setShowMoreLocation] = useState(false);
	const [showMoreColour, setShowMoreColour] = useState(false);


	/** LIFECYCLES **/
	useEffect(() => {
		const queryParams = JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
			},
		});

		if (searchFilter?.search?.brandList?.length == 0) {
			delete searchFilter.search.brandList;
			setShowMoreBrand(false);
			router.push(`/model?input=${queryParams}`, `/model?input=${queryParams}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router.push(`/model?input=${queryParams}`, `/model?input=${queryParams}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			router.push(`/model?input=${queryParams}`, `/model?input=${queryParams}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options;
			router.push(`/model?input=${queryParams}`, `/model?input=${queryParams}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.colourList?.length == 0) {
			delete searchFilter.search.colourList;
			router.push(`/model?input=${queryParams}`, `/model?input=${queryParams}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.locationList) setShowMoreLocation(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const modelBrandSelectHandler = useCallback(
		async (e: any) => {
			try {
			const isChecked = e.target.checked;
			const value = e.target.value;

			if (isChecked) {
				// Add brand
				await router.push(
				`/model?input=${JSON.stringify({
					...searchFilter,
					search: {
					...searchFilter.search,
					brandList: [
						...(searchFilter?.search?.brandList || []),
						value,
					],
					},
				})}`,
				undefined,
				{ scroll: false }
				);
			} else if (searchFilter?.search?.brandList?.includes(value)) {
				// Remove brand
				await router.push(
				`/model?input=${JSON.stringify({
					...searchFilter,
					search: {
					...searchFilter.search,
					brandList: searchFilter?.search?.brandList?.filter(
						(item: string) => item !== value
					),
					},
				})}`,
				undefined,
				{ scroll: false }
				);
			}

			if (searchFilter?.search?.brandList?.length === 0) {
				alert("error");
			}

			console.log("modelBrandSelectHandler:", value);
			} catch (err: any) {
			console.log("ERROR, modelBrandSelectHandler:", err);
			}
		},
		[searchFilter, router]
	);

	const modelTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('modelTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, modelTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const modelLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.locationList?.length == 0) {
					alert('error');
				}

				console.log('modelLocationSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, modelLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const modelColourSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, colourList: [...(searchFilter?.search?.colourList || []), value] },
						})}`,
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, colourList: [...(searchFilter?.search?.colourList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.colourList?.includes(value)) {
					await router.push(
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								colourList: searchFilter?.search?.colourList?.filter((item: string) => item !== value),
							},
						})}`,
						`/model?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								colourList: searchFilter?.search?.colourList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.colourList?.length == 0) {
					alert('error');
				}

				console.log('modelColourSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, modelColourSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const modelPeriodHandler = useCallback(
		async (e: any, type: string) => {
			const value = e.target.value;

			if (type === 'start') {
			await router.push(
				`/model?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
					periodsRange: {   
					...searchFilter.search.periodsRange,
					start: value,
					},
				},
				})}`,
				undefined,
				{ scroll: false }
			);
			} else {
			await router.push(
				`/model?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
					periodsRange: {   
					...searchFilter.search.periodsRange,
					end: value,
					},
				},
				})}`,
				undefined,
				{ scroll: false }
			);
		}
		},
		[searchFilter],
	);

	const modelPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/model?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/model?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/model?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/model?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/model?input=${JSON.stringify(initialInput)}`,
				`/model?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>Models FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-model'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Model</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type="text"
							className="search-input"
							placeholder="What are you looking for?"
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key === "Enter") {
								setSearchFilter({
									...searchFilter,
									search: { ...searchFilter.search, text: searchText },
								});
								}
							}}
							endAdornment={
								<CancelRoundedIcon
								onClick={() => {
									setSearchText("");
									setSearchFilter({
									...searchFilter,
									search: { ...searchFilter.search, text: "" },
									});
								}}
								/>
							}
							sx={{
								"& .MuiOutlinedInput-notchedOutline": {
									borderColor: "#ddd",
								},
								"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
									borderColor: "#717171",
								},
							}}
						/>

						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-model'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Brand
					</p>
					<Stack
						className={`model-brand`}
						style={{ height: showMoreBrand ? '253px' : '115px' }}
						onMouseEnter={() => setShowMoreBrand(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.brandList) {
								setShowMoreBrand(false);
							}
						}}
					>
						{modelBrand.map((brand: string) => {
							return (
								<Stack className={'input-box'} key={brand}>
									<Checkbox
										id={brand}
										className="model-checkbox"
										color="default"
										size="small"
										value={brand}
										checked={(searchFilter?.search?.brandList || []).includes(brand as ModelBrand)}
										onChange={modelBrandSelectHandler}
									/>
									<label htmlFor={brand} style={{ cursor: 'pointer' }}>
										<Typography className="model-type">{brand}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-model'} mb={'30px'}>
					<Typography className={'title'}>Model Type</Typography>
					{modelType.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								id={type}
								className="model-checkbox"
								color="default"
								size="small"
								value={type}
								onChange={modelTypeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as ModelBodyType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="model_type">{type}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<Stack className={'find-your-model'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Location
					</p>
					<Stack
						className={`model-location`}
						style={{ height: showMoreLocation ? '253px' : '115px' }}
						onMouseEnter={() => setShowMoreLocation(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.locationList) {
								setShowMoreLocation(false);
							}
						}}
					>
						{modelLocation.map((location: string) => {
							return (
								<Stack className={'input-box'} key={location}>
									<Checkbox
										id={location}
										className="model-checkbox"
										color="default"
										size="small"
										value={location}
										checked={(searchFilter?.search?.locationList || []).includes(location as ModelLocation)}
										onChange={modelLocationSelectHandler}
									/>
									<label htmlFor={location} style={{ cursor: 'pointer' }}>
										<Typography className="model-type">{location}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-model'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Colour
					</p>
					<Stack
						className={`model-colour`}
						style={{ height: showMoreColour ? '253px' : '115px' }}
						onMouseEnter={() => setShowMoreColour(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.colourList) {
								setShowMoreColour(false);
							}
						}}
					>
						{modelColour.map((colour: string) => {
							return (
								<Stack className={'input-box'} key={colour}>
									<Checkbox
										id={colour}
										className="model-checkbox"
										color="default"
										size="small"
										value={colour}
										checked={(searchFilter?.search?.colourList || []).includes(colour as ModelColour)}

										onChange={modelColourSelectHandler}
									/>
									<label htmlFor={colour} style={{ cursor: 'pointer' }}>
										<Typography className="model-type">{colour}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-model'} mb={'30px'}>
					<Typography className={'title'}>Period Year</Typography>
					<Stack className="year-input">
						<FormControl>
							<InputLabel id="demo-simple-select-label">Start</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.periodsRange?.start ?? 1900}
								label="Start"
								onChange={(e: any) => modelPeriodHandler(e, 'start')}
								MenuProps={MenuProps}
							>
								{modelYears.map((year: number) => (
									<MenuItem
										value={year}
										disabled={(searchFilter?.search?.periodsRange?.end || 0) < year}
										key={year}
									>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="central-divider"></div>
						<FormControl>
							<InputLabel id="demo-simple-select-label">End</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.periodsRange?.end ?? new Date().getFullYear()}
								label="End"
								onChange={(e: any) => modelPeriodHandler(e, 'end')}
								MenuProps={MenuProps}
							>
								{modelYears.map((period: number) => (
									<MenuItem
										value={period}
										disabled={(searchFilter?.search?.periodsRange?.start || 1900) > period}
										key={period}
									>
										{period}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Stack>
				<Stack className={'find-your-model'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									modelPriceHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									modelPriceHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
