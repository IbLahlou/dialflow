import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentCalls = [
  {
    name: "فاطمة الزهراء",
    email: "fatima.zahra@email.com",
    avatarSrc: "/avatars/01.png",
    avatarFallback: "فز",
    task: "تأكيد الطلب",
    duration: "4م 32ث",
  },
  {
    name: "يوسف العلوي",
    email: "youssef.alaoui@email.com",
    avatarSrc: "/avatars/02.png",
    avatarFallback: "يع",
    task: "الدعم الفني",
    duration: "7م 14ث",
  },
  {
    name: "ليلى بنعمر",
    email: "laila.benomar@email.com",
    avatarSrc: "/avatars/03.png",
    avatarFallback: "لب",
    task: "استفسار عن المنتج",
    duration: "3م 45ث",
  },
  {
    name: "كريم الفاسي",
    email: "karim@email.com",
    avatarSrc: "/avatars/04.png",
    avatarFallback: "كف",
    task: "طلب إرجاع",
    duration: "5م 17ث",
  },
  {
    name: "سارة الإدريسي",
    email: "sara.idrissi@email.com",
    avatarSrc: "/avatars/05.png",
    avatarFallback: "سإ",
    task: "إدارة الحساب",
    duration: "2م 56ث",
  },
]

export function RecentCalls() {
  return (
    <div className="space-y-8">
      {recentCalls.map((call, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={call.avatarSrc} alt="Avatar" />
            <AvatarFallback>{call.avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{call.name}</p>
            <p className="text-sm text-muted-foreground">{call.email}</p>
          </div>
          <div className="ml-auto text-sm">
            <p className="font-medium">{call.task}</p>
            <p className="text-muted-foreground">{call.duration}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

