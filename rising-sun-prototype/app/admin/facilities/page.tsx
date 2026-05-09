"use client";

import { useState } from "react";
import {
  Dumbbell,
  Clock,
  Users,
  Pencil,
  Wrench,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { facilities, type Facility } from "@/data/facilities";
import { toast } from "sonner";

const statusStyles: Record<Facility["status"], string> = {
  Open: "bg-green-100 text-green-700 border-green-200",
  Available: "bg-blue-100 text-blue-700 border-blue-200",
  "Class Based": "bg-orange-100 text-orange-700 border-orange-200",
  "Under Maintenance": "bg-red-100 text-red-700 border-red-200",
};

const statusOptions: Facility["status"][] = [
  "Open",
  "Available",
  "Under Maintenance",
  "Class Based",
];

export default function FacilitiesPage() {
  const [facilityList, setFacilityList] = useState<Facility[]>(facilities);
  const [editTarget, setEditTarget] = useState<Facility | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    openingTime: "",
    closingTime: "",
    capacity: 0,
    status: "Open" as Facility["status"],
    rules: "",
  });

  function openEdit(f: Facility) {
    const [open, close] = f.timing.split("–").map((s) => s.trim());
    setEditForm({
      name: f.name,
      description: f.description,
      openingTime: open,
      closingTime: close,
      capacity: f.capacity,
      status: f.status,
      rules: f.rules.join("\n"),
    });
    setEditTarget(f);
  }

  function handleSave() {
    if (!editTarget) return;
    setFacilityList((prev) =>
      prev.map((f) =>
        f.id === editTarget.id
          ? {
              ...f,
              name: editForm.name,
              description: editForm.description,
              timing: `${editForm.openingTime} – ${editForm.closingTime}`,
              capacity: editForm.capacity,
              status: editForm.status,
              rules: editForm.rules
                .split("\n")
                .map((r) => r.trim())
                .filter(Boolean),
            }
          : f
      )
    );
    setEditTarget(null);
    toast.success("Facility updated successfully");
  }

  function handleMarkMaintenance(id: string) {
    setFacilityList((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "Under Maintenance" as const } : f
      )
    );
    toast.success("Facility marked as Under Maintenance");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Facilities</h1>
          <p className="text-sm text-muted-foreground">
            Manage facility settings
          </p>
        </div>
        <Button className="bg-[#0E5F4F] hover:bg-[#0E5F4F]/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Facility
        </Button>
      </div>

      {/* Facility Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {facilityList.map((f) => (
          <Card key={f.id} className="overflow-hidden">
            <div className="h-2 bg-[#0B1F3A]" />
            <CardContent className="pt-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0B1F3A]/5 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-[#0B1F3A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1F3A]">{f.name}</h3>
                    <Badge
                      variant="outline"
                      className={`mt-1 text-xs ${statusStyles[f.status]}`}
                    >
                      {f.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {f.description}
              </p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{f.timing}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Capacity: {f.capacity}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEdit(f)}
                >
                  <Pencil className="w-3.5 h-3.5 mr-1.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleMarkMaintenance(f.id)}
                  disabled={f.status === "Under Maintenance"}
                >
                  <Wrench className="w-3.5 h-3.5 mr-1.5" />
                  Maintenance
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#0B1F3A]">
              Edit Facility
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Facility Name
              </label>
              <Input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Description
              </label>
              <Textarea
                rows={3}
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, description: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Opening Time
                </label>
                <Input
                  value={editForm.openingTime}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, openingTime: e.target.value }))
                  }
                  placeholder="e.g. 6 AM"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Closing Time
                </label>
                <Input
                  value={editForm.closingTime}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, closingTime: e.target.value }))
                  }
                  placeholder="e.g. 11 PM"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Capacity
                </label>
                <Input
                  type="number"
                  value={editForm.capacity}
                  onChange={(e) =>
                    setEditForm((p) => ({
                      ...p,
                      capacity: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Status
                </label>
                <Select
                  value={editForm.status}
                  onValueChange={(v) =>
                    v &&
                    setEditForm((p) => ({
                      ...p,
                      status: v as Facility["status"],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Rules (one per line)
              </label>
              <Textarea
                rows={4}
                value={editForm.rules}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, rules: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>
              Cancel
            </Button>
            <Button
              className="bg-[#0E5F4F] hover:bg-[#0E5F4F]/90"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
