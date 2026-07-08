import { Controller, Get, Post, Put, Body, Param, UseGuards, Request, Response } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SchedulingService } from './scheduling.service';
import { AvailabilityService } from './availability.service';
import { CalendarAdapterService } from './calendar-adapter.service';
import { SetAvailabilityDto, RescheduleDto, ConfirmDto } from './dto/scheduling.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Interview, InterviewDocument } from '../interview/schemas/interview.schema';

@ApiTags('Interview Scheduling')
@Controller('api/v1/scheduling')
export class SchedulingController {
  constructor(
    private schedulingService: SchedulingService,
    private availabilityService: AvailabilityService,
    private calendarService: CalendarAdapterService,
    @InjectModel(Interview.name) private interviewModel: Model<InterviewDocument>
  ) {}

  @Put('availability')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set Interviewer Availability' })
  async setAvailability(@Request() req: any, @Body() dto: SetAvailabilityDto) {
    const data = await this.availabilityService.setAvailability(req.user.organizationId, req.user.userId, dto);
    return { success: true, data };
  }

  @Post(':id/reschedule')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reschedule Interview' })
  async reschedule(@Request() req: any, @Param('id') id: string, @Body() dto: RescheduleDto) {
    const data = await this.schedulingService.rescheduleInterview(req.user.organizationId, id, dto, req.user.userId);
    return { success: true, data };
  }

  @Post(':id/confirm')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Confirm Attendance (Candidate)' })
  async confirm(@Request() req: any, @Param('id') id: string, @Body() dto: ConfirmDto) {
    const data = await this.schedulingService.confirmAttendance(req.user.organizationId, id, req.user.userId, dto);
    return { success: true, data };
  }

  @Get(':id/ics')
  @ApiOperation({ summary: 'Download ICS Calendar Invite' })
  async getIcs(@Param('id') id: string, @Response() res: any) {
    const interview = await this.interviewModel.findById(id).exec();
    if (!interview) return res.status(404).send('Not Found');

    const icsContent = this.calendarService.generateIcs(interview);
    res.set({
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="interview-${id}.ics"`
    });
    return res.send(icsContent);
  }
}
