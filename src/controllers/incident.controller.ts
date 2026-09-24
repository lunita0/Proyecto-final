import { Request, Response, NextFunction } from "express";
import { incidents } from "../data/incidents.data";
import { CreateIncidentDto } from "../dtos/incident.dto";
import { AppError } from "../errors/app-error";
import { IncidentStatus } from "../models/incident.model";

export class IncidentController {
  
  public getAll(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({
      ok: true,
      total: incidents.length,
      data: incidents
    });
  }

  public getStats(req: Request, res: Response, next: NextFunction) {
    const total = incidents.length;
    const open = incidents.filter(i => i.status === "OPEN").length;
    const inProgress = incidents.filter(i => i.status === "IN_PROGRESS").length;
    const resolved = incidents.filter(i => i.status === "RESOLVED").length;
    const critical = incidents.filter(i => i.priority === "CRITICAL").length;

    const totalMinutes = incidents.reduce((acc, curr) => acc + curr.estimatedMinutes, 0);
    const averageEstimatedMinutes = total > 0 ? Math.round(totalMinutes / total) : 0;

    return res.status(200).json({
      ok: true,
      data: {
        total,
        open,
        inProgress,
        resolved,
        critical,
        averageEstimatedMinutes
      }
    });
  }

  public getCritical(req: Request, res: Response, next: NextFunction) {
    const criticalIncidents = incidents.filter(i => i.priority === "CRITICAL");
    return res.status(200).json({
      ok: true,
      total: criticalIncidents.length,
      data: criticalIncidents
    });
  }

  public getPending(req: Request, res: Response, next: NextFunction) {
    const pendingIncidents = incidents.filter(i => i.status === "OPEN" || i.status === "IN_PROGRESS");
    return res.status(200).json({
      ok: true,
      total: pendingIncidents.length,
      data: pendingIncidents
    });
  }

  public getById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const incident = incidents.find(i => i.id === id);

    if (!incident) {
      return next(new AppError(404, "Incident not found"));
    }

    return res.status(200).json({
      ok: true,
      data: incident
    });
  }

  public create(req: Request, res: Response, next: NextFunction) {
    const body: CreateIncidentDto = req.body;
    
    const newId = incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1;

    const newIncident = {
      id: newId,
      ...body,
      status: "OPEN" as IncidentStatus,
      createdAt: new Date().toISOString()
    };

    incidents.push(newIncident);

    return res.status(201).json({
      ok: true,
      data: newIncident
    });
  }

  public update(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const index = incidents.findIndex(i => i.id === id);

    if (index === -1) {
      return next(new AppError(404, "Incident not found"));
    }

    const { title, description, reporter, location, priority, estimatedMinutes } = req.body;

    incidents[index] = {
      ...incidents[index],
      title: title ?? incidents[index].title,
      description: description ?? incidents[index].description,
      reporter: reporter ?? incidents[index].reporter,
      location: location ?? incidents[index].location,
      priority: priority ?? incidents[index].priority,
      estimatedMinutes: estimatedMinutes ?? incidents[index].estimatedMinutes
    };

    return res.status(200).json({
      ok: true,
      data: incidents[index]
    });
  }

  public updateStatus(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const index = incidents.findIndex(i => i.id === id);

    if (index === -1) {
      return next(new AppError(404, "Incident not found"));
    }

    const { status } = req.body;
    const validStatuses: IncidentStatus[] = ["OPEN", "IN_PROGRESS", "RESOLVED"];

    if (!validStatuses.includes(status)) {
      return next(new AppError(400, "Invalid status"));
    }

    const currentStatus = incidents[index].status;

    if (currentStatus === "RESOLVED" && (status === "OPEN" || status === "IN_PROGRESS")) {
      return next(new AppError(400, "Invalid status transition from RESOLVED"));
    }

    incidents[index].status = status;

    return res.status(200).json({
      ok: true,
      data: incidents[index]
    });
  }

  public remove(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const index = incidents.findIndex(i => i.id === id);

    if (index === -1) {
      return next(new AppError(404, "Incident not found"));
    }

    incidents.splice(index, 1);

    return res.status(204).send();
  }
}
