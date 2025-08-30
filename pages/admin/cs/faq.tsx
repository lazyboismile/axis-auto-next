import { useMutation, useQuery } from '@apollo/client';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { TabContext } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TablePagination,
  Typography
} from '@mui/material';
import { NextPage } from 'next';
import router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { UPDATE_FAQ_BY_ADMIN } from '../../../apollo/admin/mutation';
import { GET_FAQS_BY_ADMIN } from '../../../apollo/admin/query';
import { FaqArticlesPanelList } from '../../../libs/components/admin/cs/FaqList';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { FaqCategory, FaqStatus } from '../../../libs/enums/faq.enum';
import { sweetErrorAlert } from '../../../libs/sweetAlert';
import { Faq } from '../../../libs/types/faq/faq';
import { FaqsInquiry } from '../../../libs/types/faq/faq.input';

const FaqArticles: NextPage = () => {
  const [anchorEl, setAnchorEl] = useState<(HTMLElement | null)[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [faqsInquiry, setFaqsInquiry] = useState<FaqsInquiry>({
    page: 1,
    limit: 10,
    sort: 'createdAt',
    //@ts-ignore
    direction: 'DESC',
    search: {},
  });

  const [tabValue, setTabValue] = useState<string>('ALL');
  const [searchType, setSearchType] = useState<string>('ALL');
  const [searchText, setSearchText] = useState<string>('');

  /** APOLLO REQUESTS **/
  const { data, refetch } = useQuery(GET_FAQS_BY_ADMIN, {
    fetchPolicy: 'network-only',
    variables: { input: faqsInquiry },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const list = data?.getFaqsByAdmin?.list ?? [];
      setFaqs(list);
      setTotal(data?.getFaqsByAdmin?.metaCounter?.[0]?.total ?? 0);
      setAnchorEl(new Array(list.length).fill(null));
    },
  });

  const [updateFaq] = useMutation(UPDATE_FAQ_BY_ADMIN);

  /** LIFECYCLES **/
  useEffect(() => {
    refetch();
  }, [faqsInquiry]);

  /** HANDLERS (from inquiry.tsx style) **/

  const changePageHandler = async (event: unknown, newPage: number) => {
    const newInput = { ...faqsInquiry, page: newPage + 1 };
    setFaqsInquiry(newInput);
    await refetch({ input: newInput });
  };

  const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    const newInput = { ...faqsInquiry, limit: newLimit, page: 1 };
    setFaqsInquiry(newInput);
    await refetch({ input: newInput });
  };

  const handleMenuIconClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleMenuIconClose = () => {
    setAnchorEl(new Array(anchorEl.length).fill(null));
  };

  const handleTabChange = async (event: any, newValue: string) => {
    setTabValue(newValue);
    setSearchText('');

    let updatedSearch = { ...faqsInquiry.search };
    if (newValue === 'ALL') {
      delete updatedSearch.faqStatus;
    } else {
      updatedSearch.faqStatus = newValue as FaqStatus;
    }

    const newInput = { ...faqsInquiry, page: 1, sort: 'createdAt', search: updatedSearch };
    setFaqsInquiry(newInput);
    await refetch({ input: newInput });
  };

  const textHandler = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const searchTextHandler = async () => {
    const newInput = {
      ...faqsInquiry,
      page: 1,
      search: { ...faqsInquiry.search, text: searchText },
    };
    setSearchText('');
    setFaqsInquiry(newInput);
    await refetch({ input: newInput });
  };

  const searchTypeHandler = async (newValue: string) => {
    setSearchType(newValue);

    let updatedSearch = { ...faqsInquiry.search };
    if (newValue === 'ALL') {
      delete updatedSearch.faqCategory;
    } else {
      updatedSearch.faqCategory = newValue as FaqCategory;
    }

    const newInput = { ...faqsInquiry, page: 1, sort: 'createdAt', search: updatedSearch };
    setFaqsInquiry(newInput);
    await refetch({ input: newInput });
  };

  const updateFaqHandler = async (_id: string, type: string) => {
    try {
      const { data } = await updateFaq({
        variables: { input: { _id, faqStatus: type } },
      });

      if (data?.updateFaqByAdmin?._id) {
        await refetch();
      }
    } catch (err: any) {
      await sweetErrorAlert('Failed to update FAQ', err.message);
    }

    handleMenuIconClose();
  };

  return (
    <Box className="content">
      <Box className="title flex_space">
        <Typography variant="h2">FAQ Management</Typography>
        <Button
          className="btn_add"
          variant="contained"
          size="medium"
          onClick={() => router.push('/admin/cs/addFaq')}
        >
          <AddRoundedIcon sx={{ mr: '8px' }} />
          ADD
        </Button>
      </Box>

      <Box className="table-wrap">
        <TabContext value={tabValue}>
          <Box>
            <List className="tab-menu">
              {['ALL', 'ACTIVE', 'BLOCKED', 'DELETE'].map((tab) => (
                <ListItem
                  key={tab}
                  onClick={(e) => handleTabChange(e, tab)}
                  className={tabValue === tab ? 'li on' : 'li'}
                  sx={{ cursor: 'pointer' }}
                >
                  {tab}
                </ListItem>
              ))}
            </List>
            <Divider />

            {/* Search Section */}
            <Stack className="search-area" sx={{ m: '24px', flexDirection: 'row', alignItems: 'center' }}>
              <Select
                sx={{ width: '160px', mr: '20px' }}
                value={searchType}
                onChange={(e) => searchTypeHandler(e.target.value)}
              >
                <MenuItem value="ALL">All</MenuItem>
                <MenuItem value="AGENTS">Agents</MenuItem>
                <MenuItem value="COMMUNITY">Community</MenuItem>
                <MenuItem value="MEMBERSHIP">Membership</MenuItem>
                <MenuItem value="MODEL">Model</MenuItem>
                <MenuItem value="PAYMENT">Payment</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </Select>

              <OutlinedInput
                value={searchText}
                onChange={(e) => textHandler(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') searchTextHandler();
                }}
                sx={{ width: '100%' }}
                placeholder="Search by content"
                endAdornment={
                  <>
                    {searchText && (
                      <CancelRoundedIcon
                        onClick={async () => {
                          const newInput = {
                            ...faqsInquiry,
                            page: 1,
                            search: { ...faqsInquiry.search, text: '' },
                          };
                          setSearchText('');
                          setFaqsInquiry(newInput);
                          await refetch({ input: newInput });
                        }}
                        sx={{ cursor: 'pointer' }}
                      />
                    )}
                    <InputAdornment position="end" onClick={searchTextHandler} sx={{ cursor: 'pointer' }}>
                      <img src="/img/icons/search_icon.png" alt="searchIcon" />
                    </InputAdornment>
                  </>
                }
              />
            </Stack>
            <Divider />
          </Box>

          <FaqArticlesPanelList
            faqs={faqs}
            anchorEl={anchorEl}
            handleMenuIconClick={handleMenuIconClick}
            handleMenuIconClose={handleMenuIconClose}
            updateFaqHandler={updateFaqHandler}
          />

          <TablePagination
            rowsPerPageOptions={[10, 20, 40, 60]}
            component="div"
            count={total}
            rowsPerPage={faqsInquiry.limit}
            page={faqsInquiry.page - 1}
            onPageChange={changePageHandler}
            onRowsPerPageChange={changeRowsPerPageHandler}
          />
        </TabContext>
      </Box>
    </Box>
  );
};

export default withAdminLayout(FaqArticles);
