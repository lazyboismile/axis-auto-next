import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Divider, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { modelDescShort, REACT_APP_API_URL, topModelRank } from '../../config';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Model } from '../../types/model/model';
import { formatterStr } from '../../utils';

interface PopularModelCardProps {
  model: Model;
}

const PopularModelCard = (props: PopularModelCardProps) => {
  const { model } = props;
  const device = useDeviceDetect();
  const router = useRouter();

  const renderCardContent = () => (
    <>
      <Box
        component={'div'}
        className={'card-img'}
        style={{
          backgroundImage: `url(${model?.modelImages?.[0] ? `${REACT_APP_API_URL}/${model.modelImages[0]}` : '/img/fallback-image.jpg'})`
        }}
      >
        {model?.modelViews >= topModelRank && (
          <div className="status">
            <span>Most Searched</span>
          </div>
        )}
        <div className="view-like-box">
          <IconButton color={'inherit'} aria-label="View count">
            <RemoveRedEyeIcon />
          </IconButton>
          <Typography className="view-cnt">{model.modelViews ?? 0}</Typography>
        </div>
        {device === 'mobile' && <Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />}
      </Box>
      <Box component={'div'} className={'info'}>
        <strong className={'title'}>{model.modelYear} - {model.modelTitle}</strong>
        <p className={'desc'}>
          {model.modelDesc
            ? model.modelDesc.length > modelDescShort
              ? model.modelDesc.substring(0, modelDescShort) + "..."
              : model.modelDesc
            : 'No desc'}
        </p>
        <Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />
        <div className={'options'}>
          <div>
            <img src="/img/icons/miles.svg" alt="miles" />
            <span>
              {formatterStr(model.modelOdometer ?? 0)} {model.modelOdoUnit === 'KILOMETERS' ? 'km' : 'mi'}
            </span>
          </div>
          <div>
            <img src="/img/icons/fuelType.svg" alt="fuel" />
            <span>{model.modelFuelType ?? 'N/A'}</span>
          </div>
          <div>
            <img src="/img/icons/CVT.svg" alt="cvt" />
            <span>{model.modelTransmission ?? 'N/A'}</span>
          </div>
        </div>
        <Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />
        <div className={'bott'}>
          <p>${formatterStr(model.modelPrice ?? 0)}</p>
          <Box className={'more-details'}>
            <Link href={`/model/detail?id=${model._id}`}>
              <span>View Details</span>
            </Link>
            <img src="/img/icons/rightup.svg" alt="Navigate to details" />
          </Box>
        </div>
      </Box>
    </>
  );

  return (
    <Stack className="popular-card-box" key={model._id}>
      {renderCardContent()}
    </Stack>
  );
};

export default PopularModelCard;