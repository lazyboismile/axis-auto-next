import { useQuery } from '@apollo/client';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';
import { GET_FAQS } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { T } from '../../types/common';
import { Faq } from '../../types/faq/faq';
import { FaqsInquiry } from '../../types/faq/faq.input';
import Inquiry from './Inquiry';

interface FaqProps {
  initialInput?: FaqsInquiry;
}

// Styled Accordion component (fixed)
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const Faq: React.FC<FaqProps> = ({ initialInput = defaultInput }) => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [category, setCategory] = useState<string>('model');
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [faqsInquiry, setFaqsInquiry] = useState<FaqsInquiry>(defaultInput);

	/** APOLLO REQUESTS **/

  const {
		loading: getFaqsLoading,
		data: getFaqsData,
		error: getFaqsError,
		refetch: getFaqsRefetch,
	} = useQuery(GET_FAQS, {
		fetchPolicy: "network-only",
		variables: { input: faqsInquiry },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFaqs(data?.getFaqs?.list);
			setTotal(data?.getFaqs?.metaCounter[0]?.total ?? 0);
		}
	});

	/** LIFECYCLES **/

	/** HANDLERS **/

  const changeCategoryHandler = (newCategory: string) => {
  setCategory(newCategory);

  const formattedCategory = newCategory.toUpperCase(); 

  //@ts-ignore
  setFaqsInquiry(prev => ({
    ...prev,
    page: 1,
    search: { faqCategory: formattedCategory },
  }));

  getFaqsRefetch({
    input: {
      ...faqsInquiry,
      page: 1,
      search: { faqCategory: formattedCategory },
    }
  });
};



  const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (device === 'mobile') {
    return <div>FAQ MOBILE</div>;
  } else {
    return (
      <Stack className={'faq-content'}>
        <Box className={'categories'} component={'div'}>
          <div
            className={category === 'model' ? 'active' : ''}
            onClick={() => {
              changeCategoryHandler('model');
            }}
          >
            Model
          </div>
          <div
            className={category === 'payment' ? 'active' : ''}
            onClick={() => {
              changeCategoryHandler('payment');
            }}
          >
            Payment
          </div>
          <div
            className={category === 'buyers' ? 'active' : ''}
            onClick={() => {
              changeCategoryHandler('buyers');
            }}
          >
            For Buyers
          </div>
          <div
            className={category === 'agents' ? 'active' : ''}
            onClick={() => {
              changeCategoryHandler('agents');
            }}
          >
            For Agents
          </div>
          <div
            className={category === 'membership' ? 'active' : ''}
            onClick={() => {
              changeCategoryHandler('membership');
            }}
          >
            Membership
          </div>
          <div
            className={category === 'community' ? 'active' : ''}
            onClick={() => {
              changeCategoryHandler('community');
            }}
          >
            Community
          </div>
          <div
            className={category === 'other' ? 'active' : ''}
            onClick={() => {
              changeCategoryHandler('other');
            }}
          >
            Other
          </div>
        </Box>
        <Box className={'wrap'} component={'div'}>
          {faqs.length === 0 ? (
            <Typography className={'no-message'}>No FAQs not available</Typography>
          ) : (
            faqs.map((faq: Faq) => (
              <Accordion expanded={expanded === faq?._id} onChange={handleChange(faq?._id)} key={faq?._id}>
                <AccordionSummary id={`panel-${faq?._id}-header`} className="question" aria-controls={`panel-${faq?._id}-content`}>
                  <Typography className="badge" variant={'h4'}>
                    Q
                  </Typography>
                  <Typography>{faq?.subject}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack className={'answer flex-box'}>
                    <Typography className="badge" variant={'h4'} color={'primary'}>
                      A
                    </Typography>
                    <Typography>{faq?.content ?? "Answer doesn't exist right now"}</Typography>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
        <Box  className={'wrap'} component={'div'}>
          <Inquiry />
        </Box>
      </Stack>
    );
  }
};

const defaultInput: FaqsInquiry = {
  page: 1,
  limit: 5,
  sort: 'createdAt', //@ts-ignore
  direction: 'DESC',
  search: { //@ts-ignore
    faqCategory: 'MODEL',
  },
};

export default Faq;