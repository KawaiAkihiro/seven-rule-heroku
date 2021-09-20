class TemporaryShiftsController < ApplicationController
  require 'date'
  before_action :logged_in_master

  def index
    #このページで全てのアクションを実行していく
    @events = current_master.individual_shifts.joins(:staff).select('individual_shifts.*, staffs.name, staffs.number, staffs.training_mode').where(temporary: false).where(deletable: false).where(start: params[:start]..params[:end])
  end
  
  def new_shift
    @event = current_master.individual_shifts.new
    @separations = current_master.shift_separations.all
    #空きシフト追加modal用のhtmlを返す
    render plain: render_to_string(partial: 'form_new_shift', layout: false, locals: { event: @event, separations:@separations })
  end

  def new_plan
    @event = current_master.individual_shifts.new
    #終日予定追加modal用のhtmlを返す
    return_html("form_new_plan")
  end

  #空きシフト(イエローシフト)を追加する
  def create_shift
    @event = current_master.individual_shifts.new(params_shift)
    @event.staff = current_master.staffs.find_by(number: 0)
    change_finishDate
    unless @event.save
      render partial: "error"
    end
  end

  #終日の予定を追加する
  def create_plan
    @event = current_master.individual_shifts.new(params_plan)
    @event.staff = current_master.staffs.find_by(number: 0)
    @event.save
  end


  def delete
    begin
      @event = current_master.individual_shifts.find(params[:shift_id])
      #削除するmodalのhtmlを返す
      return_html("form_deletable")
    rescue => exception
      #何もしない(祝日イベント対策)
    end
  end


  #シフト仮削除
  def deletable
    @event = current_master.individual_shifts.find(params[:id])
    #終日の予定なら削除
    if @event.allDay == true
      @event.destroy
    else
      #空きシフトは削除、それ以外は復活可能
      if @event.staff.number != 0
        @event.deletable = true
        @event.save
      else
        @event.destroy
      end
    end
  end

  def time_cut
    @event = current_master.individual_shifts.find(params[:id])
    
    unless @event.update(params_shift)
      render partial: "error"
    end
  end

  def verification
    @event = current_master.individual_shifts.where(temporary: false).where(deletable: false)
  end

  #シフト確定する(仮削除対象を削除)
  def perfect
    @events = current_master.individual_shifts.where(temporary: false)
    #調整用に上がってきた全シフト対象
    @events.each do |shift|
        #仮削除がonのものを削除、それ以外は確定に変更していく
        if shift.deletable == true
          shift.destroy!
        else
          shift.temporary = true
          shift.save
        end
    end

    #定期的に過去のデータを削除して容量を確保するための対策
    #2ヶ月前のシフトを削除する
    reset_shifts = current_master.individual_shifts.where(start: ...Date.today.months_ago(2)).where(temporary: true)
    if reset_shifts.size > 0
      reset_shifts.each do |shift|
        shift.destroy
      end
    end

    flash[:success] = "シフトが完成しました！従業員の皆さんに共有しましょう！"
    redirect_to root_path
  end

  private
    def params_shift
      params.require(:individual_shift).permit(:start, :finish)
    end

    def params_plan
      params.require(:individual_shift).permit(:plan, :start)
    end
end
