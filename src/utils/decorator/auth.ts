import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '@/constants/common';

export const Public = () => SetMetadata(PUBLIC_KEY, true);
