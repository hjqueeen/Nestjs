import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { NewSubscriberDto, VisitorDto } from './dto/activity.dto';
import { StatistikService } from './statistik.service';

@Controller('statistik')
@ApiTags('Statistik')
export class StatistikController {
  constructor(private statistikService: StatistikService) {}

  @Get('/visitor')
  @ApiOperation({ summary: 'Get number of visitors this month' })
  @ApiOkResponse({
    description: 'Getting visitor succesful',
    type: VisitorDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Forbidden request.' })
  getVisitor(): Promise<VisitorDto> {
    return this.statistikService.getThisMonthsVisitor();
  }

  @Get('/subscriber')
  @ApiOperation({ summary: 'Get number of new subscribers this week' })
  @ApiOkResponse({
    description: 'Getting subscriber succesful',
    type: NewSubscriberDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Forbidden request.' })
  getSubscriber(): Promise<NewSubscriberDto> {
    return this.statistikService.getNewSubscriber();
  }
}
