import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from '@prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(':email')
  async getNotes(@Param('email') email: string): Promise<Note[]> {
    return await this.notesService.getNotes(email);
  }

  @Post()
  async createNote(@Body() data: Note): Promise<Note> {
    const createdNote = await this.notesService.createNote(data);
    if (!createdNote) throw new BadRequestException('Failed to create note');
    return createdNote;
  }

  @Get(':tag')
  async getNoteByTag(@Param('tag') tag: string): Promise<Note[]> {
    const noteFound = await this.notesService.getNoteByTag(tag);
    if (!noteFound)
      throw new NotFoundException(`Note with tag ${tag} not found`);
    return noteFound;
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() data: Note): Promise<Note> {
    try {
      const updatedNote = await this.notesService.updateNote(Number(id), data);
      if (!updatedNote) throw new NotFoundException('Note not found');
      return updatedNote;
    } catch (error) {
      throw new NotFoundException('Note not found');
    }
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const deleteResponse = await this.notesService.deleteNote(Number(id));
      if (!deleteResponse) throw new NotFoundException('Note not found');
      return { message: `Note with id: ${id} deleted` };
    } catch (error) {
      throw new NotFoundException('Note not found');
    }
  }
}
