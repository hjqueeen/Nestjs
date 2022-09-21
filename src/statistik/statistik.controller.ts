import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { ActivityDto } from './dto/activity.dto';
import { StatistikService } from './statistik.service';

@Controller('statistik')
@ApiTags('Statistik')
export class StatistikController {
  constructor(private statistikService: StatistikService) {}

  @Get('/activity')
  @ApiOperation({ summary: 'Get activity' })
  @ApiOkResponse({
    description: 'Getting activity succesful',
    type: ActivityDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Forbidden request.' })
  getActivity(): Promise<ActivityDto> {
    return this.statistikService.getActivity();
  }
}
