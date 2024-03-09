import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    const employee = await this.databaseService.employee.create({
      data: createEmployeeDto,
    });
    return employee;
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const employees = await this.databaseService.employee.findMany({
        where: { role },
      });
      return employees;
    }
    return await this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const employee = await this.databaseService.employee.findUnique({
      where: { id },
    });
    return employee;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    const employee = await this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
    return employee;
  }

  async remove(id: number) {
    const employee = await this.databaseService.employee.delete({
      where: { id },
    });
    return employee;
  }
}
