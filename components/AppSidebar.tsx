import React from 'react'
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarFooter, SidebarSeparator, SidebarGroupLabel, SidebarGroupAction } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, ChevronUp, Home, Inbox, Plus, Projector, Search, Settings, User2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
const AppSidebar = () => {

  const items =[
    {
      title:"Home",
      url:"/",
      icon:Home                        
    },
       {
      title:"Inbox",
      url:"#",
      icon:Inbox                     
    },
       {
      title:"Calendar",
      url:"#",
      icon:Calendar                  
    },
       {
      title:"Search",
      url:"#",
      icon:Search                    
    },
 {
      title:"Settings",
      url:"#",
      icon:Settings                  
    },
  ]
  return (

      
      <Sidebar collapsible='icon'> 
<SidebarHeader className='py-4'> 
      <SidebarMenu> 

        <SidebarMenuItem> 
          <SidebarMenuButton asChild>  
            <Link href={'/'}> 
            <Image src="./vercel.svg" alt="Vercel Logo" width={20} height={20} />
            <span>Jojo dev</span>
            </Link>
          </SidebarMenuButton>


        </SidebarMenuItem>
      </SidebarMenu>
 
</SidebarHeader>

<SidebarSeparator/>

<SidebarContent> 

  <SidebarGroup> 
    <SidebarGroupLabel> Application </SidebarGroupLabel>
    <SidebarGroupContent> 
      <SidebarMenu> 
        {
          items.map((item)=>(
            <SidebarMenuItem key={item.title}> 
            <SidebarMenuButton asChild> 
              <Link href={item.url}> 
                  <item.icon/> 

                  <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            
            </SidebarMenuItem>
          ) ) 
        }

      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>


  <SidebarGroup> 
    <SidebarGroupLabel> Projects </SidebarGroupLabel>

      <SidebarGroupAction title="Add Project">
        <Plus /> <span className="sr-only">Add Project</span>
      </SidebarGroupAction>
      <SidebarGroupContent> 
            <SidebarMenu> 
              <SidebarMenuItem>
            <SidebarMenuButton asChild>  
                
                  <Link href='/#'> 
                      <Projector/>
                      see all projects
                  </Link>

              </SidebarMenuButton>


              </SidebarMenuItem>


              <SidebarMenuItem>
            <SidebarMenuButton asChild>  
                
                  <Link href='/#'> 
                      <Plus/>
                      Add projects
                  </Link>

              </SidebarMenuButton>


              </SidebarMenuItem>




              
              
            </SidebarMenu>

      </SidebarGroupContent>









  </SidebarGroup>



{/* collapsible */}



<Collapsible defaultOpen className='group/collapsible'>   
  <SidebarGroup> 
    <SidebarGroupLabel asChild> 
            <CollapsibleTrigger > 
               Collapsible 
               <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180'/>

            </CollapsibleTrigger>

    </SidebarGroupLabel>

<CollapsibleContent> 
      
      <SidebarGroupContent> 
            <SidebarMenu> 
              <SidebarMenuItem>
            <SidebarMenuButton asChild>  
                
                  <Link href='/#'> 
                      <Projector/>
                      see all projects
                  </Link>

              </SidebarMenuButton>


              </SidebarMenuItem>


              <SidebarMenuItem>
            <SidebarMenuButton asChild>  
                
                  <Link href='/#'> 
                      <Plus/>
                      Add projects
                  </Link>

              </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
      </SidebarGroupContent>
</CollapsibleContent>
  </SidebarGroup>
</Collapsible>

</SidebarContent>


<SidebarSeparator/>
<SidebarFooter>
  <SidebarMenu> 
    <SidebarMenuItem> 
      <DropdownMenu> 
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton> 
            <User2/> Jojo Dev <ChevronUp className='ml-auto'/>
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'> 
          <DropdownMenuItem> 
            Accounts
          </DropdownMenuItem>

           
          <DropdownMenuItem> 
            Settings 
          </DropdownMenuItem>

           
          <DropdownMenuItem> 
          Logout
          </DropdownMenuItem>
          </DropdownMenuContent>


        

      </DropdownMenu>

    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>

      </Sidebar>
  )
}

export default AppSidebar