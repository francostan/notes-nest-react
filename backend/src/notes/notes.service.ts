import { Injectable } from '@nestjs/common';
import { Note } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
    constructor(private prisma: PrismaService) {}

    getNotes(email: string): Promise<Note[]> {
        return this.prisma.note.findMany({
            where: { email: { equals: email } }
        });
    }

    getNoteByTag(tag: string): Promise<Note[]> {
        return this.prisma.note.findMany({
            where: { tags: { has: tag } }
        });
    }

    createNote(data: Note): Promise<Note> {
        return this.prisma.note.create({ data });
    }

    updateNote(id: number, data: Note): Promise<Note> {
        return this.prisma.note.update({
            where: { id },
            data
        })        
    }

    deleteNote(id: number): Promise<Note> {
        return this.prisma.note.delete({ where: { id } })
    }
}
