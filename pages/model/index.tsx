import { useMutation, useQuery } from '@apollo/client';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Box, Button, Menu, MenuItem, Pagination, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { LIKE_TARGET_MODEL } from '../../apollo/user/mutation';
import { GET_MODELS } from '../../apollo/user/query';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Filter from '../../libs/components/model/Filter';
import ModelCard from '../../libs/components/model/ModelCard';
import { Direction, Message } from '../../libs/enums/common.enum';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { T } from '../../libs/types/common';
import { Model } from '../../libs/types/model/model';
import { ModelsInquiry } from '../../libs/types/model/model.input';

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const ModelList: NextPage = ({ initialInput, ...props }: any) => {
  const device = useDeviceDetect();
  const router = useRouter();

  const [searchFilter, setSearchFilter] = useState<ModelsInquiry>(
    router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
  );
  const [models, setModels] = useState<Model[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortingOpen, setSortingOpen] = useState(false);
  const [filterSortName, setFilterSortName] = useState('New');

  /** APOLLO REQUESTS **/

  const [likeTargetModel] = useMutation(LIKE_TARGET_MODEL)

	const {
		loading: getModelsLoading,
		data: getModelsData,
		error: getModelsError,
		refetch: getModelsRefetch,
	} = useQuery(GET_MODELS, {
		fetchPolicy: "network-only",
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setModels(data?.getModels?.list);
			setTotal(data?.getModels?.metaCounter[0]?.total)
		}
	});

  /** LIFECYCLES **/
  useEffect(() => {
    if (router.query.input) {
      const inputObj = JSON.parse(router?.query?.input as string);
      setSearchFilter(inputObj);
    }
    //@ts-ignore
    setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
  }, [router]);

  useEffect(() => {
		//BACKEND REFETCH
		console.log("searchFilter:", searchFilter);
		getModelsRefetch({input: searchFilter}).then();
	}, [searchFilter]);

  /** HANDLERS **/
const likeModelHandler = async (user: T, id: string) => {
		try {
			if(!id) return;
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			// execute likeTargetModel Mutuation
			await  likeTargetModel({
				variables: {input: id},
			});

			// execute getPropertiesRefetch
			await getModelsRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log("ERROR, likePropertyHandler: ", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

  const handlePaginationChange = async (event: ChangeEvent<unknown>, value: number) => {
    searchFilter.page = value;
    await router.push(
      `/model?input=${JSON.stringify(searchFilter)}`,
      `/model?input=${JSON.stringify(searchFilter)}`,
      {
        scroll: false,
      },
    );
    setCurrentPage(value);
  };

  const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setSortingOpen(true);
  };

  const sortingCloseHandler = () => {
    setSortingOpen(false);
    setAnchorEl(null);
  };

  const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    switch (e.currentTarget.id) {
      case 'new':
        setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: Direction.ASC });
        setFilterSortName('New');
        break;
      case 'lowest':
        setSearchFilter({ ...searchFilter, sort: 'modelPrice', direction: Direction.ASC });
        setFilterSortName('Lowest Price');
        break;
      case 'highest':
        setSearchFilter({ ...searchFilter, sort: 'modelPrice', direction: Direction.DESC });
        setFilterSortName('Highest Price');
    }
    setSortingOpen(false);
    setAnchorEl(null);
  };

  if (device === 'mobile') {
    return <h1>MODELS MOBILE</h1>;
  } else {
    return (
      <div id="model-list-page" style={{ position: 'relative' }}>
        <div className="container">
          <Box component={'div'} className={'right'}>
            <span>Sort by</span>
            <div>
              <Button onClick={sortingClickHandler} endIcon={<KeyboardArrowDownRoundedIcon />}>
                {filterSortName}
              </Button>
              <Menu anchorEl={anchorEl} open={sortingOpen} onClose={sortingCloseHandler} sx={{ paddingTop: '5px' }}>
                <MenuItem onClick={sortingHandler} id={'new'} disableRipple>
                  New
                </MenuItem>
                <MenuItem onClick={sortingHandler} id={'lowest'} disableRipple>
                  Lowest Price
                </MenuItem>
                <MenuItem onClick={sortingHandler} id={'highest'} disableRipple>
                  Highest Price
                </MenuItem>
              </Menu>
            </div>
          </Box>

          <Stack className={'model-page'}>
            <Stack className={'filter-config'}>
              {/* @ts-ignore */}
              <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} initialInput={initialInput} />
            </Stack>

            <Stack className="main-config" mb={'76px'}>
              <Stack className={'list-config'}>
                {models?.length === 0 ? (
                  <div className={'no-data'}>
                    <img src="/img/icons/icoAlert.svg" alt="" />
                    <p>No Models found!</p>
                  </div>
                ) : (
                  models.map((model: Model) => {
                    return <ModelCard model={model} likeModelHandler={likeModelHandler} key={model?._id} />; 
                  })
                )}
              </Stack>

              <Stack className="pagination-config">
                {models.length !== 0 && (
                  <Stack className="pagination-box">
                    <Pagination
                      page={currentPage}
                      count={Math.ceil(total / searchFilter.limit)}
                      onChange={handlePaginationChange}
                      shape="circular"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "#405FF2", 
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                          backgroundColor: "#405FF2", 
                          color: "#fff",             
                        },
                        "& .MuiPaginationItem-root:hover": {
                          backgroundColor: "#FFCCBC",
                        },
                      }}
                    />
                  </Stack>
                )}

                {models.length !== 0 && (
                  <Stack className="total-result">
                    <Typography>
                      Total {total} model{total > 1 ? 'es' : ''} available
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    );
  }
};

ModelList.defaultProps = {
  initialInput: {
    page: 1,
    limit: 9,
    sort: 'createdAt',
    direction: 'DESC',
    search: {
      periodsRange: {
        start: 1970,
        end: new Date().getFullYear(),
      },
      pricesRange: {
        start: 0,
        end: 20000000,
      },
    },
  },
};

export default withLayoutBasic(ModelList);
